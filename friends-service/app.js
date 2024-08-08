import { app, query } from 'mu';

app.get('/statistics', async function (req, res) {
  const getMostFriends = async (inverse = false) => {
    const queryString = `
      prefix foaf: <http://xmlns.com/foaf/0.1/>
    
      select distinct ?person (COUNT(?friend) as ?friendCount) where {
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

    let x = await query(queryString);
    return x.results.bindings[0];
  };

  res.send({
    friends: await getMostFriends(),
    friendof: await getMostFriends(true),
  });
});