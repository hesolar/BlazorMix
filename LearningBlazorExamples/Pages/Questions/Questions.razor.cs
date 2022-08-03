using Microsoft.AspNetCore.Components;

namespace LearningBlazorExamples.Pages;

public class QuestionsBase : ComponentBase {

    protected override void OnInitialized()
    {
        getQuestion();
    }

    public bool ended=false;
    public String currentCuestion=String.Empty;

    public List<int> preguntadas = Enumerable.Range(1, 35).ToList();

   public List<string> failed { get; set; }=new();
   public  int GoodAnswes = 0;

   public Random myObject = new ();
    public void getQuestion() {
        try
        {
        int pos = myObject.Next(0, preguntadas.Count);
        int number = preguntadas[pos];

        preguntadas.Remove(number);

        this.currentCuestion = getLine(number, "Pages/Questions/questions.txt");

        }
        catch (System.ArgumentOutOfRangeException e) {
            this.ended = true;
        }

    }
    public void GoodQuestion()
    {

        this.GoodAnswes += 1;
        getQuestion();
    } 
    public void BadQuestion()
    {
        this.failed.Add(this.currentCuestion);
        getQuestion();
    }


    public string getLine(int line, string fileName) {


        using (var sr = new StreamReader(fileName)) {
            for (int i = 1; i < line; i++)
                sr.ReadLine();
            return sr.ReadLine();
        }


    }

}