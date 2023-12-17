
import { redirect } from 'next/navigation';
import React from 'react';

interface CustomerProfile {
  name: string;
  email: string;
  // Add more fields as needed
}

interface AccountPageProps {
  customer: CustomerProfile;
}

const AccountPage: React.FC<AccountPageProps> = ({ customer }) => {
  

  // Check if customer is signed in
  if (!customer) {
    // Redirect to homepage if not signed in
    redirect("/");
  }

  return (
    <div>
      <h1>Welcome, {customer.name}!</h1>
      <p>Email: {customer.email}</p>
      {/* Add more profile information here */}
    </div>
  );
};

export default AccountPage;
