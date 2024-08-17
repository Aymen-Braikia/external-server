const { MongoClient: e, ServerApiVersion: res } = require("mongodb");
(express = require("express")), (app = express());
let cors = require("cors");
app.use(express.json()), app.use(cors());
app.listen(8080, () => console.log("Server is running on port: " + 8080)),
	app.get("/gg", (req, res) => {
		res.json("gg");
	});
const client = new e("mongodb+srv://Aymen:Far_cry_6@cluster0.eelos6c.mongodb.net/?retryWrites=true&w=majority", {
	serverApi: {
		version: res.v1,
		strict: !0,
		deprecationErrors: !0,
	},
});
async function run() {
	await client.connect();
}
async function checkKey(key, req) {
	if (!req.body.k) return;

	let reqIP = req.headers["true-client-ip"],
		dbInfo = await client.db("script").collection("keys").findOne({
			key: key,
		});
	if (!dbInfo)
		(dbInfo = await client.db("script").collection("internal").findOne({
			key: key,
		})),
			(r = !1);
	if (
		(dbInfo &&
			reqIP !== dbInfo.ip &&
			(await client
				.db("script")
				.collection("keys")
				.updateOne(
					{
						key: key,
					},
					{
						$push: {
							ip: reqIP,
						},
					}
				)),
		dbInfo)
	)
		if (dbInfo.ip.length > 0 && !dbInfo.flexible)
			if (dbInfo.ip[dbInfo.ip.length - 1]) if (dbInfo.ip[dbInfo.ip.length - 1] !== reqIP) return false;
	return !!dbInfo && !r;
}
run().catch(console.dir),
	app.post("/verify", async (e, res) => {
		(await checkKey(e.body.k, e))
			? res.json({
					valid: true,
					dotExe: encrypt(`v_1:${url}:["0000","10110111","232133003","301303","030100"]`, `aym`),
					// hidden: { 0: "ᐃᐃᐃᐃ", 1: "ⲆᐃⲆⲆᐃⲆⲆⲆ", 2: "ⵠΔⵠⲆΔΔᐃᐃΔ", 3: "ΔᐃⲆΔᐃΔ", 4: "ᐃΔᐃⲆᐃᐃ" },
					// ⵠΔⵠⲆΔΔᐃᐃΔ: "https://raw.githubusercontent.com/AymenBraikia/script/main/him.js",
					// "scriptUrl": "http://localhost:8080/script",
				})
			: res.json({
					valid: false,
				});
	});

function encrypt(text, key) {
	return [...text]
		.map((x, i) => (x.codePointAt() ^ key.charCodeAt(i % key.length) % 255).toString(16).padStart(2, "0"))
		.join("");
}

function decrypt(text, key) {
	return String.fromCharCode(
		...text.match(/.{1,2}/g).map((e, i) => parseInt(e, 16) ^ key.charCodeAt(i % key.length) % 255)
	);
}
// let enc = encrypt(`v_1:${url}:[${hidden_vars}]`, `aym`)
// // let dec = decrypt(enc, `aym`)

const url = "https://raw.githubusercontent.com/himhimself708/him/main/himself.js";
