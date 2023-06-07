const express = require('express');
const { PrismaClient } = require('@prisma/client');
var cors = require('cors');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/atlet', async (req, res) => {
  const {
    medali,
    jenisKelamin,
    olahraga,
    umur,
    minumur,
    maxumur,
    berat,
    minberat,
    maxberat,
    tinggi,
    mintinggi,
    maxtinggi,
    event,
    orderBy,
  } = req.query;

  // const { title } = req.query;

  const medali_filter = medali?.split(',');
  const olahraga_filter = olahraga?.split(',');

  const atlet = await prisma.atlet.findMany({
    where: {
      umur: Number(umur) || undefined,
      // medali: medali || undefined,
      // medali: {
      //   contains: medali || undefined,
      // },
      berat: Number(berat) || undefined,
      tinggi: Number(tinggi) || undefined,
      medali: { in: medali_filter } || undefined,
      jenisKelamin: jenisKelamin || undefined,
      // olahraga: olahraga || undefined,
      olahraga: { in: olahraga_filter } || undefined,
      event: {
        contains: event || undefined,
      },

      // to get range
      AND: [
        { umur: { lte: Number(maxumur) || undefined } },
        { umur: { gte: Number(minumur) || undefined } },

        { berat: { lte: Number(maxberat) || undefined } },
        { berat: { gte: Number(minberat) || undefined } },

        { tinggi: { lte: Number(maxtinggi) || undefined } },
        { tinggi: { gte: Number(mintinggi) || undefined } },
      ],
    },

    orderBy: {
      medali: 'asc',
    },
  });

  res.json(atlet);
});

// get all atlet
app.get('/atlet', async (req, res) => {
  try {
    const atlet = await prisma.atlet.findMany();
    res.status(200).json(atlet);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

// get atlet by id
app.get('/atlet/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const atlet = await prisma.atlet.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(atlet);
  } catch (e) {
    res.status(404).json({ msg: e.message });
  }
});

// create data atlet
app.post(`/atlet`, async (req, res) => {
  const { nama, jenisKelamin, umur, tinggi, berat, olahraga, event, medali } =
    req.body;
  const result = await prisma.atlet.create({
    data: {
      nama,
      jenisKelamin,
      umur,
      tinggi,
      berat,
      olahraga,
      event,
      medali,
    },
  });
  res.json(result);
});

// update data atlet by id
app.patch(`/atlet/:id`, async (req, res) => {
  const { id } = req.params;
  const { nama, jenisKelamin, umur, tinggi, berat, olahraga, event, medali } =
    req.body;
  const result = await prisma.atlet.update({
    where: { id: Number(id) },
    data: {
      nama,
      jenisKelamin,
      umur,
      tinggi,
      berat,
      olahraga,
      event,
      medali,
    },
  });
  res.json(result);
});

// delete data atlet by id
app.delete(`/atlet/:id`, async (req, res) => {
  const { id } = req.params;
  const atlet = await prisma.atlet.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(atlet);
});

//

const server = app.listen(5000, () =>
  console.log(`
🚀 Server ready at: http://localhost:5000
⭐️ See sample requests: http://pris.ly/e/js/rest-express#3-using-the-rest-api`)
);
