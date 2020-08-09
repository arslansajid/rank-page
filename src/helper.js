export const translateAccountPrivacy = (value) => {
  if(value === 'public_account'){
    return 1
  }
  else if(value === 'private_account'){
    return 2
  }
  else if(value === 'hidden_account'){
    return 3
  }
  else return null
}

export const translateAccountFollowingPrivacy = (value) => {
  if(value === ' public_following'){
    return 1
  }
  else if(value === ' mutual_following'){
    return 2
  }
  else if(value === 'hidden_following'){
    return 3
  }
  else return null
}