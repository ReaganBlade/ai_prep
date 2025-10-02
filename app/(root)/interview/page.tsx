import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();

  // If no user, this shouldn't happen due to layout protection, but let's be safe
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <>
      <h3>Interview generation</h3>

      <Agent userName={user.name} userId={user.id} type="generate" />
    </>
  );
};

export default Page;
