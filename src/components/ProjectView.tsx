import { useParams } from 'react-router-dom';

const ProjectView = (props: any) => {
    const { slides } = props;
    const { id } = useParams();
    return (<p>Test {id}</p>)
}

export default ProjectView;