package com.smartshop.backend.dto;


public class PlanRequest {
    private String budget;
    private String days;
    private String calories;
    private String protein;
    private MealSelection meals;
    private String[] dietaryRequirements;
    private String allergies;
    private String supermarket;
    private String people;


    public PlanRequest() {
    }

    public String getBudget() {
        return budget;
    }

    public void setBudget(String budget) {
        this.budget = budget;
    }

    public String getDays() {
        return days;
    }

    public void setDays(String days) {
        this.days = days;
    }

    public String getCalories() {
        return calories;
    }

    public void setCalories(String calories) {
        this.calories = calories;
    }

    public String getProtein() {
        return protein;
    }

    public void setProtein(String protein) {
        this.protein = protein;
    }

    public MealSelection getMeals() {

        return meals;
    }

    public void setMeals(MealSelection meals) {
        this.meals = meals;
    }

    public String[] getDietaryRequirements() {
    return dietaryRequirements;
    }

    public void setDietaryRequirements(String[] dietaryRequirements){
        this.dietaryRequirements = dietaryRequirements;
    }

    public String getAllergies(){
        return allergies;
    }


    public void setAllergies(String allergies) {
        this.allergies = allergies;
    }

    public String getSupermarket(){
        return supermarket;
    }

    public void setSupermarket(String supermarket){
        this.supermarket = supermarket;
    }

     public String getPeople(){
        return people;
    }

    public void setPeople(String people){
        this.people = people;
    }
}
