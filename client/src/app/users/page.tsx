"use client";
import React, { useEffect, useState } from "react";
import UsersList from "@/components/organisms/UsersList";
import ErrorModal from "@/components/molecules/ErrorModal";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import { useHttpClient } from "@/hooks/http-hook";

const Users: React.FC = () => {
 const { isLoading, error, sendRequest, clearError } = useHttpClient();
 const [loadedUsers, setLoadedUsers] = useState<[]>([]);

 return (
  <React.Fragment>
   <ErrorModal error={error} onClear={clearError} />
   {isLoading && (
    <div className="center">
     <LoadingSpinner />
    </div>
   )}
   {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
  </React.Fragment>
 );
};

export default Users;
