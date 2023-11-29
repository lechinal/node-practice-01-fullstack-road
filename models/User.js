const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { isEmail } = require("validator");
/**
 * "validator"-biblioteca utila pt validarea datelor de intrare cum ar fi: email, url-uri, siruri de caractere;
 * Este o modalitate eficienta de a asigura ca datele de intrare respecta anumite criterii si poate fi utila pt gestionarea validarilor;
 *
 * Functia isEmail face parte din pachetul "validator" si este utilizata pt a verifica daca un sir de caractere reprezinta
 * o adresa de email valida conform unor reguli specifice.
 * In cazul nostru este o functie de validare, care verifica daca valoarea introdusa in campul de intrare respecta un format
 * valid de adresa de email.
 */

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter an password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
});

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
