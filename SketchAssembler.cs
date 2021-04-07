using MS.Paint2.Repository;
using System;

namespace MS.Paint2
{
    public static class SketchAssembler
    {
        public static Sketch Map(SketchModel sketchModel)
        {
            return new Sketch(sketchModel.Name, Convert.ToBase64String(sketchModel.ImageData), sketchModel.DateCreated);
        }
    }
}
