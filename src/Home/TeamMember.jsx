import { useGetTeamQuery } from "../Features/Team/TeamApi";

export default function TeamMember() {
  const { data: team } = useGetTeamQuery();
  console.log(team);

  return (
    <div className='mt-8'>
      <h3 className='text-xl font-bold'>Team Members</h3>
      <div className='mt-3 space-y-4'>
        {team &&
          team?.length > 0 &&
          team.map((t) => (
            <div key={t?.id} className='checkbox-container'>
              <img src={t?.avatar} className='team-avater' />
              <p className='label'>{t?.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
