const allowedRoleIds = [
  "419551212560449547", // QUEEN
  "419554086023593984", // ADMIN
  "419552824393990155", // MODO
];

const checkPermissions = (interaction) => {
  const memberRoles = interaction.member.roles.cache;
  return allowedRoleIds.some((roleId) => memberRoles.has(roleId));
};

module.exports = { checkPermissions };
