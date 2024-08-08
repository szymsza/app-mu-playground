import { app, query, sparqlEscapeString } from 'mu';

// Get some simple statistics
app.get('/statistics', async function (req, res) {
  const getMostFriends = async (inverse = false) => {
    const queryString = `
      prefix foaf: <http://xmlns.com/foaf/0.1/>
      prefix core: <http://mu.semte.ch/vocabularies/core/>
    
      SELECT DISTINCT ?personId (COUNT(?friend) as ?friendCount) 
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
        
        ?person core:uuid ?personId. 
      }
      GROUP BY ?personId
      ORDER BY DESC(?friendCount)
      LIMIT 1
    `;

    return (await query(queryString)).results.bindings[0] ?? null;
  };

  res.send(200, {
    friends: await getMostFriends(),
    friendof: await getMostFriends(true),
  });
});

// Move all friends of one person to another one
app.post('/steal/:from/:to', async function(req, res) {
  const { from, to } = req.params;

  const queryString = `
    prefix foaf: <http://xmlns.com/foaf/0.1/>
    prefix core: <http://mu.semte.ch/vocabularies/core/>
  
    DELETE {
      ?personFrom foaf:knows ?friend
    }
    INSERT {
      ?personTo foaf:knows ?friend
    }
    USING <http://mu.semte.ch/application>
    WHERE {
      ?personFrom foaf:knows ?friend;
                  core:uuid ${sparqlEscapeString(from)}.
                  
      ?personTo core:uuid ${sparqlEscapeString(to)}. 
    }
  `;

  res.send(201, (await query(queryString)).results.bindings[0] ?? null);
});