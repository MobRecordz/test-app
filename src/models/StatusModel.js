const StatusModel = {};

StatusModel.ACTIVATED = {
  id: 1,
  label: 'Активен'
}

StatusModel.DEACTIVATED = {
  id: 2,
  label: 'Деактивирован'
}

StatusModel.BLOCKED = {
  id: 3,
  label: 'Заблокирован'
}

StatusModel.LIST = [
  StatusModel.ACTIVATED,
  StatusModel.DEACTIVATED,
  StatusModel.BLOCKED,
]

export default StatusModel;
