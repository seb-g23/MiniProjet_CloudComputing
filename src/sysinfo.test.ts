import request from 'supertest';
import app from './app';

// Simulation du module 'systeminformation'
jest.mock('systeminformation', () => ({
  cpu: jest.fn().mockResolvedValue({ manufacturer: 'Intel', brand: 'i7', cores: 8 }),
  system: jest.fn().mockResolvedValue({ model: 'XPS 13', manufacturer: 'Dell' }),
  mem: jest.fn().mockResolvedValue({ total: 16000000, free: 8000000 }),
  osInfo: jest.fn().mockResolvedValue({ platform: 'linux', distro: 'Ubuntu' }),
  currentLoad: jest.fn().mockResolvedValue({ avgload: 1.5 }),
  processes: jest.fn().mockResolvedValue({ all: 150, running: 100 }),
  diskLayout: jest.fn().mockResolvedValue([{ type: 'SSD', name: 'disk0', size: 256000000000 }]),
  networkInterfaces: jest.fn().mockResolvedValue([{ iface: 'eth0', ip4: '192.168.1.1' }]),
}));

// test de la rêquete GET 
describe('GET /api/v1/sysinfo', () => {
  it('200 status', async () => {
    const response = await request(app).get('/api/v1/sysinfo');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('cpu');
    expect(response.body).toHaveProperty('system');
    expect(response.body).toHaveProperty('mem');
    expect(response.body).toHaveProperty('os');
    expect(response.body).toHaveProperty('currentLoad');
    expect(response.body).toHaveProperty('processes');
    expect(response.body).toHaveProperty('diskLayout');
    expect(response.body).toHaveProperty('networkInterfaces');
  });

  it('404 error', async () => {
    const response = await request(app).get('/api/v1');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Erreur 404 : Route non trouvée.');
  });
});

