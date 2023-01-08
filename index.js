const express = require( "express" )
const app = express();
const port = process.env.PORT || 5000;
const cors = require( "cors" )
app.use( cors() )
app.use( express.json() );

// db connection
const mysql = require( 'mysql' );

var connection = mysql.createConnection( {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'backend'
} );

connection.connect();

async function run () {
	app.get( "/api/v1/longest-duration-movies", ( req, res ) => {
		const result = connection.query( 'SELECT * FROM movies ORDER BY runtimeMinutes DESC limit 10', function ( error, results, fields ) {
			if ( error ) throw error;
			results = JSON.parse( JSON.stringify( results ) )
			res.send( results );
		} );

	} )

	app.post( "/api/v1/new-movie", ( req, res ) => {
		const movie = req.body;
		var query = connection.query( 'INSERT INTO movies SET ?', movie, function ( error, results, fields ) {
			if ( error ) throw error;
			res.send( "success" )
		} );

	} )


}
run().catch( error => console.log( error ) )


app.get( "/", ( req, res ) => {
	res.send( "Onito Technologies Backend server task is running !" )
} )

app.listen( port, () => {
	console.log( "Onito Technologies Private Limited backend server task is running at ", port )
} )