const tape = require('tape');
const convert = require('./');

const convertWithPrecision = (a, b, c, precision = 4, opt = {}) => {
  return convert(a, b, c, Object.assign({}, opt, { precision }));
};

tape('test px to physical', t => {
  t.equal(convert(1, 'in', 'px'), 96);
  t.equal(convert(1, 'px', 'in'), 1 / 96);
  t.equal(convert(4, 'in', 'px'), 384);
  t.equal(convert(1, 'in', 'px', { pixelsPerInch: 72 }), 72);
  t.equal(convert(6, 'cm', 'px'), 227);
  t.equal(convert(10, 'mm', 'px'), 38);
  t.equal(convert(10, 'mm', 'px', { pixelsPerInch: 72 }), 28);
  t.equal(convert(10, 'px', 'mm', { precision: 2 }), 2.65);
  t.equal(convert(11, 'px', 'in', { precision: 3 }), 0.115);
  t.end();
});

tape('test basic conversion functions', t => {
  t.equal(convert(1, 'm', 'm'), 1);
  t.equal(convert(1, 'cm', 'm'), 0.01);
  t.equal(convert(1, 'mm', 'm'), 0.001);
  t.equal(convert(1, 'm', 'cm'), 100);
  t.equal(convert(1, 'm', 'mm'), 1000);
  t.equal(convertWithPrecision(1, 'm', 'ft'), 3.2808);
  t.equal(convert(1, 'ft', 'in'), 12);
  t.equal(convert(1, 'in', 'ft'), 1 / 12);
  t.equal(convertWithPrecision(1, 'm', 'ft'), 3.2808);
  t.equal(convertWithPrecision(1, 'm', 'ft'), 3.2808);
  t.equal(convertWithPrecision(1, 'm', 'in'), 39.3701);
  t.equal(convert(1, 'in', 'm'), 0.0254);
  t.equal(convert(1, 'cm', 'm'), 0.01);
  t.equal(convert(1, 'm', 'cm'), 100);
  t.equal(convert(72, 'pt', 'in'), 1);
  t.equal(convert(1, 'in', 'pt'), 72);
  t.equal(convert(1, 'in', 'pc'), 6);
  t.equal(convert(6, 'pc', 'in'), 1);
  t.equal(convert(6, 'pc', 'pc'), 6);
  t.equal(convert(6, 'in', 'in'), 6);
  t.end();
});

tape('test API and errors', t => {
  t.throws(() => convert(2, 'gold', 'foo'));
  t.throws(() => convert(NaN, 'px', 'in'));
  t.throws(() => convert(25));
  t.deepEqual(convert.units, [ 'mm', 'cm', 'm', 'pc', 'pt', 'in', 'ft', 'px' ]);
  t.end();
});
