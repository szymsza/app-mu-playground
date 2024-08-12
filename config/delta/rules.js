export default [
  // Custom notifier
  {
    match: {
      // form of element is {subject,predicate,object}
      predicate: { type: "uri", value: "http://xmlns.com/foaf/0.1/name" }
    },
    callback: {
      url: 'http://friends/notify', method: 'POST',
    },
    options: {
      resourceFormat: 'v0.0.1',
      gracePeriod: 1000,
      retry: 3,
      retryTimeout: 250,
      foldEffectiveChanges: true,
      ignoreFromSelf: true
    },
  },

  // Resource cache
  {
    match: {
      subject: { }
    },
    callback: {
      url: "http://resource/.mu/delta",
      method: "POST"
    },
    options: {
      resourceFormat: "v0.0.1",
      gracePeriod: 250,
      ignoreFromSelf: true
    }
  }
];