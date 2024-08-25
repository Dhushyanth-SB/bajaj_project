import express from "express";
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
app.get("/bfhl",(req,res)=>{
  res.status(200).json({
    "operation_code":1})
})
app.post("/bfhl", (req, res) => {
  const {data}= req.body;
  // Separate numbers and alphabets
  const numbers = data.filter(item => !isNaN(Number(item)));
  const alphabets = data.filter(item => isNaN(Number(item)));

  // Identify lowercase alphabets and find the highest (lexicographically)
  const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
  const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().reverse()[0]] : [];

  // Construct response object
  const response = {
      is_success: true,
      user_id: "SB_Dhushyanth_09102003",
      email: "sbdhush910@gmail.com",
      roll_number: "21BCE5659",
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet
  };
  console.log(response)
  // Send response
  res.json(response);
});
app.listen(8000, () => {
  console.log("Server listening on port 8000");
});