using System.ComponentModel.DataAnnotations;

namespace LearningBlazorExamples.Pages.ValidatingForms;
public class Person {
    [Required(ErrorMessage = "Enteraname")]
    [StringLength(10, ErrorMessage = "That name is too long")]
    public string Name { get; set; }
    [Range(0, 10, ErrorMessage = "Nobody is that old")]
    public int AgeInYears { get; set; }

    [Required]
    [Range(typeof(bool), "true", "true", ErrorMessage = "Must accept terms")]
    public bool AcceptsTerms { get; set; }

}

