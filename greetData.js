const { Client } = require('pg')
const connectionString = 'postgresql://codex:codex123@localhost/greetnames';

const client = new Client({
  connectionString: connectionString,
})

execute()

async function execute(){
    await client.connect()
    console.log('connected successfully')
    const results = client.query("select * from allnames")
    console.log(results.rows)
   // await client.end()
    console.log('Disconnected')
}