const checkHealth = (req, res) => {
    res
        .status(200)
        .json({ message: 'OK - User Service', uptime: process.uptime() });
};
export default { checkHealth };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhbHRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRyb2xsZXJzL2hlYWx0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLFdBQVcsR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUNsRCxHQUFHO1NBQ0EsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUNYLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN0RSxDQUFDLENBQUM7QUFFRixlQUFlLEVBQUUsV0FBVyxFQUFFLENBQUMifQ==