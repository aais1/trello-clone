export async function getUserBoards(id: string) {
  const resp = await fetch("http://localhost:3000/api/user/boards");
  const data = resp.json();
  return data;
}
