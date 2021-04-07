using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;

namespace MS.Paint2.Repository
{
    /// <summary>
    /// https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mongo-app?view=aspnetcore-3.1&tabs=visual-studio
    /// </summary>
    public class SketchRepository
    {
        private readonly IMongoCollection<SketchModel> _sketches;

        public SketchRepository(ISketchDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _sketches = database.GetCollection<SketchModel>(settings.SketchCollectionName);
        }

        public SketchModel Create(SketchModel sketch)
        {
            sketch.DateCreated = DateTime.UtcNow;
            _sketches.InsertOne(sketch);
            return sketch;
        }

        public SketchModel Read(string identifier)
        {
            var sketch = _sketches.Find(_ => _.Id == identifier).Single();
            return sketch;
        }

        public IList<SketchModel> ReadAll()
        {
            return _sketches.Find(new BsonDocument()).ToList();
        }
    }
}
