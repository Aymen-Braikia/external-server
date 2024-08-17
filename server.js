const fs = require("fs");
const path = require("path");
const { MongoClient: e, ServerApiVersion: res } = require("mongodb");

const { Client: s, IntentsBitField: t, EmbedBuilder: a } = require("discord.js"),
	password = process.env.Password,
	express = require("express"),
	app = express();
let cors = require("cors");
app.use(express.json()), app.use(cors());
const Port = 8080;
app.listen(Port, () => console.log("Server is running on port: " + Port)),
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
	if (!req.body.k) return sendMsg("no key was passed", channel2), !1;
	// if (!req.body.c) return sendMsg("no cookie was passed", channel2), !1;
	try {
		let s = new a()
			.setColor("#0099ff")
			.setTitle("Client Information")
			.setDescription("Attempt to login.")
			.addFields({
				name: "key",
				value: key,
			})
			.setTimestamp();
		sendMsg(
			{
				embeds: [s],
			},
			channel2
		);
	} catch (t) {
		sendMsg(`error: ${t}`, channel2);
	}
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
		try {
			let i = "name was undefined";
			try {
				i = req.body.c
					.split(";")
					.find((e) => e.trim().startsWith("starve_nickname"))
					.slice(17);
			} catch (l) {}
			let d = new a()
				.setColor("#0099ff")
				.setTitle("Client Information")
				.setDescription("The client has logged in successfully.")
				.addFields(
					{
						name: "Database Name",
						value: dbInfo.name,
					},
					{
						name: "In-game Name",
						value: "" !== i || i ? i : 'No Name Was Set ("")',
					},
					{
						name: "Key",
						value: dbInfo.key,
					},
					{
						name: "IP",
						value: reqIP || "could not get ip",
					}
				)
				.setTimestamp();
			sendMsg(
				{
					embeds: [d],
				},
				channel1
			);
		} catch (g) {
			(r = !0), sendMsg(`we have an error:${g}`, channel2);
		}
	if (dbInfo.ip.length > 0 && !dbInfo.flexible)
		if (dbInfo.ip[dbInfo.ip.length - 1])
			if (dbInfo.ip[dbInfo.ip.length - 1] !== reqIP) {
				sendMsg("Different Client IP detected \nname:" + dbInfo.name, channel2);
				return false;
			}
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
const bot = new s({
	intents: [t.Flags.Guilds, t.Flags.GuildMessages],
});
bot.on("ready", () => {
	console.log(`Logged in as ${bot.user.tag}!`);
});
let channelId1 = "1238879390306271234",
	channelId2 = "1238907048217936014",
	channel1 = null,
	channel2 = null;

function sendMsg(e, res) {
	res.send(e);
}
bot.login("MTIzODg3OTA2NjA2NTQ2OTU1Mg.G_FFSj.FaU2QNuaMy72xYVA7I0ZRzh29Pw6g96zIw_wus"),
	bot.on("ready", (e) => {
		(channel1 = bot.channels.cache.get(channelId1)),
			(channel2 = bot.channels.cache.get(channelId2)),
			sendMsg("Bot is online \uD83D\uDC80", channel1);
	});

app.get("/script", (req, res) => {
	fs.readFile(path.join(__dirname, "niggas.js"), (err, data) => {
		if (err) {
			res.writeHead(500, {
				"Content-Type": "text/plain",
			});
			res.end("Internal Server Error");
			return;
		}

		// Set the response headers and send the file content
		res.writeHead(200, {
			"Content-Type": "text/javascript",
		});
		res.end(data);
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
