//use import statement outside module in the browser
import _ from 'https://cdn.jsdelivr.net/npm/@esm-bundle/lodash@4.17.21/+esm';

import { getRoles, getCompanies } from "../modules/salaryData.js";

import {
  getAverageSalaryByRole,
  getAverageSalaryByCompany,
  getSalaryAtCompany,
  getIndustryAverageSalary,
} from "../modules/workAroundModule.js";

import { formatNumber } from "./modules/utilities.js";

// Get the companies and roles using the salaryData module.
const companies = getCompanies();
const roles = getRoles();

// input buttons for every company and role represented in the data.
renderInputButtons(companies, "company");
renderInputButtons(roles, "role");

// This function will create a new <section> with radio
// inputs based on the data provided in the labels array.
function renderInputButtons(labels, groupName) {
  const container = document.createElement("section");
  container.setAttribute("id", `${groupName}Inputs`);

  let header = document.createElement("h3");
  header.innerText = `Select a ${groupName}`;
  container.appendChild(header);

  labels.forEach((label) => {
    // Creating the radio input element.
    let divElement = document.createElement("div");
    divElement.setAttribute("class", "option");

    let inputElement = document.createElement("input");
    inputElement.setAttribute("type", "radio");
    inputElement.setAttribute("id", label);
    inputElement.setAttribute("name", groupName);
    inputElement.setAttribute("value", label);
    divElement.appendChild(inputElement);

    // Creating a label for that radio input element.
    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", label);
    labelElement.innerText = label;
    divElement.appendChild(labelElement);

    // Update the results when the input is selected.
    inputElement.addEventListener("click", updateResults);

    container.appendChild(divElement);
  });

  document.querySelector(".popup-content").prepend(container);
}

function updateResults() {
  // Get the current selected company and role from the radio button inputs.
  const company = document.querySelector("input[name='company']:checked").value;
  const role = document.querySelector("input[name='role']:checked").value;

  // If either the company or role is unselected, return.
  if (!company || !role) {
    return;
  }

  // Using the workAroundModule functions to calculate the needed data.
  const averageSalaryByRole = formatNumber(getAverageSalaryByRole(role));
  const averageSalaryByCompany = formatNumber(
    getAverageSalaryByCompany(company)
  );
  const salary = formatNumber(getSalaryAtCompany(role, company));
  const industryAverageSalary = formatNumber(getIndustryAverageSalary());

  // Render them to the screen.
  document.getElementById(
    "salarySelected"
  ).innerHTML = `The salary for ${role}s at ${company} is <span>\$${salary}</span>.`;
  document.getElementById(
    "salaryAverageByRole"
  ).innerHTML = `The industry average salary for ${role} positions is  <span>\$${averageSalaryByRole}</span>.`;
  document.getElementById(
    "salaryAverageByCompany"
  ).innerHTML = `The average salary at ${company} is  <span>\$${averageSalaryByCompany}</span>.`;
  document.getElementById(
    "salaryAverageIndustry"
  ).innerHTML = `The average salary in the Tech industry is  <span>\$${industryAverageSalary}</span>.`;
}
