import Url from '../models/Url.js';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
dotenv.config();

export const shortenUrl = async (req, res) => {
  try {
    const { long_url, alias } = req.body;

    if (!long_url) {
      return res.status(400).json({ error: 'Long URL is required' });
    }

    const shortCode = alias || nanoid(6);
    const existing = await Url.findOne({ shortCode });

    if (existing) {
      return res.status(409).json({ error: 'Alias already taken' });
    }

    await Url.create({ longUrl: long_url, shortCode });
    const short_url = `${process.env.BASE_URL}/${shortCode}`;
    res.json({ short_url });
  } catch (error) {
    console.error('Error shortening URL:', error);
    res.status(500).json({ error: 'Failed to shorten URL. Please try again.' });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });

    if (url) return res.redirect(url.longUrl);
    res.status(404).send('URL not found');
  } catch (error) {
    console.error('Error redirecting URL:', error);
    res.status(500).send('Server error');
  }
};
