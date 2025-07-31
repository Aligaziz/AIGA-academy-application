const { User, Booking, Transaction } = require('#models');
const { Err } = require('#factories/errors');

module.exports = {
  getClientDashboard,
  updateClientProfile,
};

async function getClientDashboard({ clientId }) {
  const [client, bookings, transactions] = await Promise.all([
    User.findByPk(clientId, { attributes: { exclude: ['password'] } }),
    Booking.findAll({ where: { clientId }, include: [{ model: Lesson, as: 'lesson' }] }),
    Transaction.findAll({ where: { [Op.or]: [{ fromUserId: clientId }, { toUserId: clientId }] } }),
  ]);
  if (!client) throw new Err('Client not found', 404);
  return { client, bookings, transactions };
}

async function updateClientProfile({ coachId, clientId, updates }) {
  const client = await User.findByPk(clientId);
  if (!client) throw new Err('Client not found', 404);
  const coachClient = await CoachClient.findOne({ where: { coachId, clientId } });
  if (!coachClient) throw new Err('Unauthorized: Not your client', 403);
  await client.update(updates, { fields: ['firstName', 'lastName', 'phone', 'bio'] });
  return client;
}
