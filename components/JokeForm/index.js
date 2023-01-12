import useSWR from "swr";

export default function JokeForm() {
  const jokes = useSWR("/api/jokes");

  async function handleSubmit(event) {
    event.preventDefault();

    // const newJoke = event.target.elements.joke.value

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("/api/jokes", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);

        jokes.mutate();

        event.target.reset();
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="joke-input">Enter a new Joke</label>
      <input id="joke-input" type="text" name="joke" />
      <button type="submit">Submit new Joke</button>
    </form>
  );
}
