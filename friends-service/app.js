import { app, query, sparqlEscapeUri } from 'mu';

// Get some simple statistics
app.get('/statistics', async function (req, res) {
  const getMostFriends = async (inverse = false) => {
    const queryString = `
      prefix foaf: <http://xmlns.com/foaf/0.1/>
    
      SELECT DISTINCT ?person (COUNT(?friend) as ?friendCount) 
      WHERE {
        ${
          inverse ? `
            ?friend a foaf:Person;
              foaf:knows ?person.
          ` : `
            ?person a foaf:Person;
              foaf:knows ?friend.
          `
        }
      }
      GROUP BY ?person
      ORDER BY DESC(?friendCount)
      LIMIT 1
    `;

    return (await query(queryString)).results.bindings[0] ?? null;
  };

  res.send({
    friends: await getMostFriends(),
    friendof: await getMostFriends(true),
  });
});

// Move all friends of one person to another one
app.get('/steal/:from/:to', async function(req, res) {
  const { from, to } = req.params;

  const queryString = `
    prefix foaf: <http://xmlns.com/foaf/0.1/>
  
    DELETE {
      ?personFrom foaf:knows ?friend
    }
    INSERT {
      ?personTo foaf:knows ?friend
    }
    USING <http://mu.semte.ch/application>
    WHERE {
      VALUES ?personFrom {${sparqlEscapeUri(from)}}
      VALUES ?personTo {${sparqlEscapeUri(to)}}
    
      ?personFrom foaf:knows ?friend
    }
  `;

  res.send((await query(queryString)).results.bindings[0] ?? null);
});