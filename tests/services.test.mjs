import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';

import { apiConfig } from '../src/config/api.js';
import forumPosts from '../src/data/forumPosts.js';
import * as authService from '../src/services/authService.js';
import * as forumService from '../src/services/forumService.js';

afterEach(() => { apiConfig.mode = 'mock'; });

test('login rechaza campos vacíos y devuelve una sesión mock sin contraseña ni token', async () => {
  for (const [email, password] of [['', ''], ['  ', 'ejemplo'], ['a@ejemplo.com', '  ']]) {
    await assert.rejects(authService.login(email, password), /Completá email y contraseña\./);
  }
  const session = await authService.login('  personal@ejemplo.com  ', 'no-se-guarda');
  assert.deepEqual(session, { user: { email: 'personal@ejemplo.com' }, mode: 'mock' });
  assert.equal(JSON.stringify(session).includes('no-se-guarda'), false);
});

test('logout no crea datos persistentes', async () => {
  assert.equal(await authService.logout(), undefined);
});

test('recuperación normaliza el email, rechaza el vacío y no devuelve un código inventado', async () => {
  await assert.rejects(authService.requestPasswordReset('  '), /Ingresá tu email\./);
  assert.deepEqual(await authService.requestPasswordReset(' personal@ejemplo.com '), {
    email: 'personal@ejemplo.com', mode: 'mock',
  });
});

test('confirmación valida longitud, campos vacíos y coincidencia de contraseñas', async () => {
  const input = { code: '9'.repeat(5), newPassword: 'ejemplo', repeatPassword: 'ejemplo' };
  await assert.rejects(authService.confirmPasswordReset(input), /Ingresá el código de 6 dígitos\./);
  input.code = '9'.repeat(6);
  await assert.rejects(authService.confirmPasswordReset({ ...input, newPassword: '' }), /Ingresá la nueva contraseña\./);
  await assert.rejects(authService.confirmPasswordReset({ ...input, repeatPassword: '' }), /Ingresá la nueva contraseña\./);
  await assert.rejects(authService.confirmPasswordReset({ ...input, repeatPassword: 'diferente' }), /Las contraseñas no coinciden\./);
});

test('cualquier código de seis posiciones permite el aviso mock, sin cambiar ni devolver contraseñas', async () => {
  for (const digit of ['2', '4', '8']) {
    const result = await authService.confirmPasswordReset({
      code: digit.repeat(6), newPassword: 'ejemplo', repeatPassword: 'ejemplo',
    });
    assert.deepEqual(result, {
      mode: 'mock', message: 'La recuperación se conectará al backend posteriormente.',
    });
  }
});

test('foro contiene los campos requeridos y entrega fijadas primero sin mutar los mocks', async () => {
  const original = JSON.stringify(forumPosts);
  const posts = await forumService.getPosts();
  assert.equal(posts.length, 5);
  assert.equal(new Set(posts.map((post) => post.id)).size, posts.length);
  let foundUnpinned = false;
  for (const post of posts) {
    for (const field of ['id', 'title', 'content', 'author', 'sector', 'date', 'pinned']) {
      assert.ok(Object.hasOwn(post, field), field);
    }
    if (!post.pinned) foundUnpinned = true;
    if (post.pinned) assert.equal(foundUnpinned, false);
  }
  posts[0].title = 'Cambio local de prueba';
  assert.equal(JSON.stringify(forumPosts), original);
  assert.notEqual((await forumService.getPosts())[0].title, 'Cambio local de prueba');
});

test('detalle obtiene una copia por ID y comunica publicaciones inexistentes', async () => {
  const expected = forumPosts[0];
  const post = await forumService.getPostById(expected.id);
  assert.deepEqual(post, expected);
  assert.notEqual(post, expected);
  await assert.rejects(forumService.getPostById('inexistente'), /No se encontró la publicación\./);
});

test('el modo backend no implementado falla explícitamente y no devuelve mocks como datos reales', async () => {
  apiConfig.mode = 'backend';
  const expected = /La conexión con el backend todavía no está implementada\./;
  await assert.rejects(authService.login('a@ejemplo.com', 'ejemplo'), expected);
  await assert.rejects(authService.logout(), expected);
  await assert.rejects(authService.requestPasswordReset('a@ejemplo.com'), expected);
  await assert.rejects(authService.confirmPasswordReset({}), expected);
  await assert.rejects(forumService.getPosts(), expected);
  await assert.rejects(forumService.getPostById('1'), expected);
});
