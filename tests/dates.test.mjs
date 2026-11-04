import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { formatPortalDate } from '../src/utils/dates.ts';

test('instante antes da meia-noite brasileira usa o dia brasileiro',()=>{
  assert.equal(formatPortalDate('2026-11-05T01:30:00Z'),'04/11/2026');
});
test('instante depois da meia-noite brasileira muda de dia',()=>{
  assert.equal(formatPortalDate('2026-11-05T03:30:00Z'),'05/11/2026');
});
test('data sem hora conserva o dia de calendario e aceita ano bissexto',()=>{
  assert.equal(formatPortalDate('2026-11-05'),'05/11/2026');
  assert.equal(formatPortalDate('2028-02-29'),'29/02/2028');
});
test('data ausente ou invalida nao quebra a tela',()=>{
  for(const input of [null,undefined,'','invalida','2026-02-30',new Date(NaN)])assert.equal(formatPortalDate(input),'-');
});
test('formatacao longa e horario continuam em pt-BR',()=>{
  assert.equal(formatPortalDate('2026-11-05T01:30:00Z',{day:'2-digit',month:'long',year:'numeric'}),'04 de novembro de 2026');
  assert.match(formatPortalDate('2026-11-05T01:30:00Z',{hour:'2-digit',minute:'2-digit'}),/22:30/);
});
test('fuso do dispositivo nao altera a exibicao',()=>{
  const code="import {formatPortalDate} from './src/utils/dates.ts';process.stdout.write(formatPortalDate('2026-11-05T01:30:00Z'));";
  for(const zone of ['UTC','Asia/Tokyo','America/Los_Angeles']){
    const p=spawnSync(process.execPath,['--input-type=module','-e',code],{encoding:'utf8',env:{...process.env,TZ:zone}});
    assert.equal(p.status,0,p.stderr);assert.equal(p.stdout,'04/11/2026');
  }
});
