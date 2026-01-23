import express from 'express';
import cors from 'cors';
import { getToNotion, saveToNotion } from './apis/notion.ts';

const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());
app.get(`/notion`, async (req, res) => {
  try {
    const name = req.query.name;
    if (typeof name !== 'string')
      return res.status(400).json({ error: 'name must be a string' });
    const data = await getToNotion(name);
    res.json(data); // 성공 시 데이터 반환
  } catch (error) {
    console.error('GET Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post(`/notion`, async (req, res) => {
  try {
    const { name, data } = req.body;
    if (!name || !data)
      return res.status(400).json({ error: 'name and data are required' });
    await saveToNotion(name, JSON.stringify(data));
    res.status(200).json({ success: true, message: 'Saved to Notion' });
  } catch (error) {
    console.error('POST Error:', error);
    res.status(500).json({ error: 'Failed to save data' });
  }
});
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
