using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace MS.Paint2.Repository
{
    public class SketchModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        public byte[] ImageData { get; set; }
        public DateTime? DateCreated { get; set; }
    }
}
