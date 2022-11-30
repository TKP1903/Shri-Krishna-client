import { Loading as LoadingView } from "./common";
import {
  Error404,
  ErrorLogin,
  ErrorPermission,
  ErrorSession,
} from "./ErrorViews";
import { Classroom, CoursesEnrolled } from "./Routes";

export default function Views({ view }: { view?: string }) {
  if (!view) {
    return <Classroom />;
  }
  switch (view) {
    case "classroom":
      return <Classroom />;
    case "Courses":
      return <CoursesEnrolled />;

    case "loading":
      return <LoadingView />;

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
}
