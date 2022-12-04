import { useContext, useState } from 'react';

import { Loading as LoadingView } from './common';
import { Error404, ErrorLogin, ErrorPermission, ErrorSession } from './ErrorViews';
import { Classroom, Courses, RecentUploads } from './Routes';

export default function Views({ view }: { view?: string }) {
  const ReturnComp = ({ view }: { view?: string }) => {
    if (!view) {
      return <Classroom />;
    }
    switch (view) {
      // route views
      case "classroom":
        return <Classroom />;
      case "courses":
        return <Courses />;
      case "recent-uploads":
        return <RecentUploads />;

      // misc views
      case "loading":
        return <LoadingView message="Checking Permissions..." />;

      // error views
      case "error.404":
        return <Error404 />;
      case "error.login":
        return <ErrorLogin />;
      case "error.expired":
        return <ErrorSession />;
      case "error.forbidden":
      case "error.unauthorized":
        return <ErrorPermission />;
      default:
        return <Error404 />;
    }
  };
  return <ReturnComp view={view} />;
}
