using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace InstituteApi.Models
{
    [Table("student_complaints")]
    public class StudentComplaint
    {
        [Key]
        public long Id { get; set; }

        public bool Deleted { get; set; } = false;

        [Column("Status", TypeName = "varchar(20)")]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public ComplaintStatus Status { get; set; } = ComplaintStatus.ACTIVE;

        public int StudentId { get; set; }

        public required string Description { get; set; }

        public DateTime Date { get; set; } = DateTime.UtcNow;
    }
}
