using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InstituteApi.Models
{
    [Table("student_complaints")]
    public class StudentComplaint
    {
        [Key]
        public long Id { get; set; }

        public bool IsDeleted { get; set; } = false;

        public ComplaintStatus Status { get; set; } = ComplaintStatus.Active;

        public int StudentId { get; set; }

        public required string Description { get; set; }

        public DateTime Date { get; set; } = DateTime.UtcNow;
    }
}
