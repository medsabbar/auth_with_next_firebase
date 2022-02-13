import Home from '../components/Home';
import { useUser } from '../components/UserContext';
import { useRouter } from 'next/router';

export default function HomePage(props) {
	const router = useRouter();
	const { user } = useUser();
	if (props.protected && !user) {
		router.replace('/login');
	}
	return <Home />;
}

export async function getStaticProps(context) {
	return {
		props: {
			protected: true,
		},
	};
}
