// scripts/mockServer.cjs
const { randomInt } = require("crypto");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("src/test/db.json");
const middlewares = jsonServer.defaults();
server.use(jsonServer.bodyParser);
// Envelope wrapper: wrap all GET responses in { data: ... }
router.render = (req, res) => {
  const data = res.locals.data;
  if ((req.method === "GET") | (req.method === "POST")) {
    res.jsonp({ data });
  } else {
    res.jsonp({ data });
  }
};

// ===========================================================================
// Custom route handlers for nested/queried endpoints
// ===========================================================================

// get prediction for image
server.post("/neural-models/predictions", (req, res, next) => {
  if (req.method === "POST") {
    const db = router.db.getState();
    // const random_id = randomInt({ min: 0, max: db.predictions.length - 1 });
    const predictions = db.predictions?.["1"];
    const prediction = predictions.headers.map((item) => ({
      classifier: item,
      probability: 1,
    }));
    predictions.rows[0].map(
      (item, index) => (prediction[index].probability = item),
    );
    res.jsonp({ data: prediction });
  }
  next();
});

// get classifiers
server.get("/classifiers", (req, res, next) => {
  if (req.query.genusId) {
    const genusId = Number(req.query.genusId);
    const db = router.db.getState();
    const species = db.species.filter((item) => genusId === item.genusId);
    return res.jsonp({ data: species });
  }
  next();
});

// authenticate user
server.post("/user/login", (req, res, next) => {
  if (req.method === "POST") {
    const db = router.db.getState();
    const researcher = db.researchers.find(
      (r) =>
        r.email === req.body.email &&
        r.password_hash === req.body.password_hash,
    );
    if (researcher) {
      return res.jsonp({
        data: {
          token: "1234444",
          surname: researcher.surname,
          name: researcher.name,
          patronymic: researcher.patronymic,
          email: researcher.email,
          id: researcher.id,
        },
      });
    }
    return res.status(404).jsonp({ message: "asdvas" });
  }
  next();
});
server.post("/user/register", (req, res, next) => {
  if (req.method === "POST") {
    const db = router.db.getState();
    db.researchers.push({ ...req.body, id: db.researchers.length });
    db.commit;
    const r = req.body;
    return res.jsonp({
      token: "1234",
      surname: r.surname,
      name: r.name,
      patronymic: r.patronymic,
      email: r.email,
      id: r.id,
    });
  }
  next();
});

// Researchers — filter by ids
server.get("/researchers", (req, res, next) => {
  if (req.query.ids) {
    const ids = req.query.ids
      .split(",")
      .map(Number)
      .filter((n) => !isNaN(n));
    const db = router.db.getState();
    const filtered = db.researchers.filter((r) => ids.includes(r.id));
    res.jsonp({ data: filtered });
  }
  next();
});

// Researches — filter by ids
server.get("/researches", (req, res, next) => {
  if (req.query.ids) {
    const ids = req.query.ids
      .split(",")
      .map(Number)
      .filter((n) => !isNaN(n));
    const db = router.db.getState();
    const filtered = db.researches.filter((r) => ids.includes(r.id));
    return res.jsonp({ data: filtered });
  }
  next();
});

// Researches — predictions
server.get("/researches/:id/predictions", (req, res) => {
  const db = router.db.getState();
  const predictions = db.predictions?.[req.params.id];
  if (!predictions) {
    return res.status(404).jsonp({ error: "Predictions not found" });
  }
  res.jsonp({ data: predictions });
});

// Plants — species by genus_id
server.get("/plants/species", (req, res) => {
  const genusId = Number(req.query.genus_id);
  const db = router.db.getState();
  if (genusId && db.species) {
    const filtered = db.species.filter((s) => {
      // species belong to a genus via their position in the array
      return (
        s.id === genusId ||
        s.id % db.genera.length === genusId % db.genera.length
      );
    });
    return res.jsonp({ data: filtered });
  }
  res.jsonp({ data: db.species ?? [] });
});

// Plants — descriptions
server.get("/plants/descriptions/:id", (req, res) => {
  const db = router.db.getState();
  const desc = db.plantDescriptions?.find(
    (d) => d.id === Number(req.params.id),
  );
  if (!desc) {
    return res.status(404).jsonp({ error: "Description not found" });
  }
  res.jsonp({ data: desc });
});

// Plants — genera, leafTypes, lifeForms (flat pass-through)
server.get("/plants/genera", (req, res) => {
  const db = router.db.getState();
  res.jsonp({ data: db.genera ?? [] });
});
server.get("/plants/leaf-types", (req, res) => {
  const db = router.db.getState();
  res.jsonp({ data: db.leafTypes ?? [] });
});
server.get("/plants/life-forms", (req, res) => {
  const db = router.db.getState();
  res.jsonp({ data: db.lifeForms ?? [] });
});

// Labs — organization types
server.get("/laboratories/organization-types", (req, res) => {
  const db = router.db.getState();
  res.jsonp({ data: db.organizationTypes ?? [] });
});

// Locations — countries
server.get("/locations/countries", (req, res) => {
  const db = router.db.getState();
  res.jsonp({ data: db.countries ?? [] });
});

// Locations — regions by country_id
server.get("/locations/regions", (req, res) => {
  const countryId = Number(req.query.country_id);
  const db = router.db.getState();
  const filtered = db.regions?.filter((r) => r.country_id === countryId) ?? [];
  res.jsonp({ data: filtered });
});

// Locations — districts by region_id
server.get("/locations/districts", (req, res) => {
  const regionId = Number(req.query.region_id);
  const db = router.db.getState();
  const filtered = db.districts?.filter((d) => d.region_id === regionId) ?? [];
  res.jsonp({ data: filtered });
});

// Locations — settlements by district_id
server.get("/locations/settlements", (req, res) => {
  const districtId = Number(req.query.district_id);
  const db = router.db.getState();
  const filtered =
    db.settlements?.filter((s) => s.district_id === districtId) ?? [];
  res.jsonp({ data: filtered });
});

// Locations — streets by settlement_id
server.get("/locations/streets", (req, res) => {
  const settlementId = Number(req.query.settlement_id);
  const db = router.db.getState();
  // In a real app streets are linked via street_settlement_association.
  // For mock, just return all streets with a random subset.
  const filtered = db.streets
    ? db.streets.slice(0, Math.max(3, (settlementId % db.streets.length) + 1))
    : [];
  res.jsonp({ data: filtered });
});

// Locations — settlement types
server.get("/locations/settlement-types", (req, res) => {
  const db = router.db.getState();
  res.jsonp({ data: db.settlementTypes ?? [] });
});

// ===========================================================================
// Route rewriting — maps /api/v1/* → json-server resource names
// ===========================================================================
server.use(middlewares);
server.use(
  jsonServer.rewriter({
    // Researchers
    "/api/v1/researchers": "/researchers",
    "/api/v1/researchers/:id": "/researchers/:id",

    // Researches
    "/api/v1/researches": "/researches",
    "/api/v1/researches/:id": "/researches/:id",

    // Plants
    "/api/v1/plants": "/plants",
    "/api/v1/plants/:id": "/plants/:id",
    "/api/v1/plants/genera": "/genera",
    "/api/v1/plants/leaf-types": "/leafTypes",
    "/api/v1/plants/life-forms": "/lifeForms",

    // Laboratories
    "/api/v1/laboratories": "/laboratories",
    "/api/v1/laboratories/:id": "/laboratories/:id",

    // Locations
    "/api/v1/locations": "/addresses",
    "/api/v1/locations/:id": "/addresses/:id",
  }),
);
server.use(router);

server.listen(3001, () => {
  console.log("JSON Server is running on port 3001");
});
