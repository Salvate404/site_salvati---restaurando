import { criarEmpresa } from './client.mjs';

const empresa = {
  nome: 'ASJ Izidoro distribuidora de lonas e toldos',
  nome_fantasia: 'Salvati Toldos',
  cnpj: '29303797000420',
  regime_tributario: 4,
  logradouro: 'Estrada do mendanha',
  numero: 1660,
  complemento: 'Ao lado do posto shell',
  municipio: 'Rio de Janeiro',
  bairro: 'Campo Grande',
  cep: 23087286,
  uf: 'RJ',
  telefone: '21965858633',
  email: 'salvatetoldos1@gmail.com',
  habilita_nfe: true,
};

const resultado = await criarEmpresa(empresa, { dryRun: true });

console.log(`HTTP ${resultado.status}`);
console.log(JSON.stringify(resultado.data, null, 2));

if (!resultado.ok) process.exitCode = 1;
