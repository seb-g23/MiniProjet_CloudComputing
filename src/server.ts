import express, {Request, Response} from 'express';

import * as sysinfo from 'systeminformation';

const app = express();
const port = process.env.PORT || 3000;

const getCpuInfo = async () => await sysinfo.cpu(); // information CPU
const getSystemInfo = async () => await sysinfo.system(); // informations système
const getMemoryInfo = async () => await sysinfo.mem(); // informations mémoire
const getOsInfo = async () => await sysinfo.osInfo(); // informations OS
const getCurrentLoad = async () => await sysinfo.currentLoad(); // informations sur la charge du processeur
const getProcessesInfo = async () => await sysinfo.processes(); // informations processys
const getDiskLayoutInfo = async () => await sysinfo.diskLayout(); // layout du disque
const getNetworkInterfacesInfo = async () => await sysinfo.networkInterfaces(); // informations sur le réseau

// récupération des informations
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



app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
