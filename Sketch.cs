using System;

namespace MS.Paint2
{
    public class Sketch
    {
        public Sketch()
        {

        }

        public Sketch(string name, string imageData, DateTime? dateCreated)
        {
            Name = name;
            ImageData = imageData;
            DateCreated = dateCreated;
        }

        public string Name { get; set; }
        public string ImageData { get; set; }

        public DateTime? DateCreated { get; set; }
    }
}
