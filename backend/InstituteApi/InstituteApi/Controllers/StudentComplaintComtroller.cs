using InstituteApi.Data;
using InstituteApi.DTO;
using InstituteApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InstituteApi.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class StudentComplaintController : ControllerBase
    {
        private readonly InstituteDbContext _context;

        public StudentComplaintController(InstituteDbContext context)
        {
            _context = context;
        }

        // POST: api/StudentComplaint/{studentId}
        [HttpPost("{studentId}")]
        public IActionResult Add(int studentId, [FromBody] StudentComplaintDto dto)
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.Description))
                return BadRequest(new { message = "Invalid complaint data." });

            var complaint = new StudentComplaint
            {
                StudentId = studentId,
                Description = dto.Description,
                Status = ComplaintStatus.Active,
                IsDeleted = false,
                Date = DateTime.UtcNow
            };

            _context.StudentComplaints.Add(complaint);
            _context.SaveChanges();

            return Ok(new
            {
                message = "Complaint registered successfully",
                complaintId = complaint.Id
            });
        }
    }
}