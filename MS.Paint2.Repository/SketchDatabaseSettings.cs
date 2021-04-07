
namespace MS.Paint2.Repository
{
    public class SketchDatabaseSettings : ISketchDatabaseSettings
    {
        public string SketchCollectionName { get; set; }
        public string LikeCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}
