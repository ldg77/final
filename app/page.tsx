import AddTodo from "@/components/AddTodo";
import DisplayTodos from "@/components/DisplayTodos";

export default function Home() {
  return (
    <main className="flex flex-col justify-between h-full">
      <DisplayTodos />
      <AddTodo />
    </main>
  );
}
