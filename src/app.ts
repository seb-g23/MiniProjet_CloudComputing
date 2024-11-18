import express, { Request, Response } from 'express';
import * as sysinfo from 'systeminformation';

const app = express();

const getCpuInfo = async () => await sysinfo.cpu();
const getSystemInfo = async () => await sysinfo.system();
const getMemoryInfo = async () => await sysinfo.mem();
const getOsInfo = async () => await sysinfo.osInfo();
const getCurrentLoad = async () => await sysinfo.currentLoad();
const getProcessesInfo = async () => await sysinfo.processes();
const getDiskLayoutInfo = async () => await sysinfo.diskLayout();
const getNetworkInterfacesInfo = async () => await sysinfo.networkInterfaces();

app.get('/api/v1/sysinfo', async (req: Request, res: Response) => {
  try {
    const cpu = await getCpuInfo();
    const system = await getSystemInfo();
    const mem = await getMemoryInfo();
    const os = await getOsInfo();
    const currentLoad = await getCurrentLoad();
    const processes = await getProcessesInfo();
    const diskLayout = await getDiskLayoutInfo();
    const networkInterfaces = await getNetworkInterfacesInfo();

    res.json({
      cpu,
      system,
      mem,
      os,
      currentLoad,
      processes,
      diskLayout,
      networkInterfaces,
    });
  } catch (error) {
    res.status(500).send('Erreur pendant la récupération des informations sur le système.');
  }
});

app.use((req: Request, res: Response) => {
  res.status(404).send('Erreur 404 : Route non trouvée.');
});

export default app;
