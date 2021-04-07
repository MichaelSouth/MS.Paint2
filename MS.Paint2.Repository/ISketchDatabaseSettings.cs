
namespace MS.Paint2.Repository
{
    public interface ISketchDatabaseSettings
    {
        string SketchCollectionName { get; set; }
        string LikeCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
