import { useRouter } from 'next/router';

const ClientProject = () => {
  const router = useRouter();
  const { clientprojectId } = router.query;

  let projectName;
  if (typeof clientprojectId === 'string') {
    projectName = clientprojectId.charAt(0).toUpperCase();
    projectName += clientprojectId.slice(1);
  }

  return (
    <div>
      <h1>The Client Project: {projectName}</h1>
    </div>
  );
};

export default ClientProject;
