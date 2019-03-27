enum Gray {
  SanJuan = 'hsl(199, 40%, 28%)',
  Wedgewood = 'hsl(199, 38%, 47%)',
  Glacier = 'hsl(199, 36%, 66%)',
  Geyser = 'hsl(199, 24%, 85%)',
  Mystic = 'hsl(199, 30%, 94%)',
  Polar = 'hsl(199, 38%, 98%)',
  White = 'hsl(199, 40%, 100%)',
}

const gray: {
  0: Gray.SanJuan
  1: Gray.Wedgewood
  2: Gray.Glacier
  3: Gray.Geyser
  4: Gray.Mystic
  5: Gray.Polar
  6: Gray.White
} = [
  Gray.SanJuan,
  Gray.Wedgewood,
  Gray.Glacier,
  Gray.Geyser,
  Gray.Mystic,
  Gray.Polar,
  Gray.White,
]

enum Yellow {
  YukonGold = 'hsl(54, 100%, 22%)',
  Olive = 'hsl(54, 97%, 28%)',
  BuddhaGold = 'hsl(54, 95%, 41%)',
  RipeLemon = 'hsl(54, 93%, 54%)',
  CandyCorn = 'hsl(54, 95%, 65%)',
  SweetCorn = 'hsl(54, 97%, 76%)',
  Buttermilk = 'hsl(54, 100%, 87%)',
}

const yellow: {
  0: Yellow.YukonGold
  1: Yellow.Olive
  2: Yellow.BuddhaGold
  3: Yellow.RipeLemon
  4: Yellow.CandyCorn
  5: Yellow.SweetCorn
  6: Yellow.Buttermilk
} = [
  Yellow.YukonGold,
  Yellow.Olive,
  Yellow.BuddhaGold,
  Yellow.RipeLemon,
  Yellow.CandyCorn,
  Yellow.SweetCorn,
  Yellow.Buttermilk,
]

enum Blue {
  MidnightBlue = 'hsl(219, 100%, 20%)',
  CongressBlue = 'hsl(219, 90%, 30%)',
  ToryBlue = 'hsl(219, 80%, 40%)',
  Mariner = 'hsl(219, 70%, 50%)',
  CornflowerBlue = 'hsl(219, 80%, 68%)',
  Sail = 'hsl(219, 90%, 85%)',
  PattensBlue = 'hsl(219, 100%, 93%)',
}

const blue: {
  0: Blue.MidnightBlue
  1: Blue.CongressBlue
  2: Blue.ToryBlue
  3: Blue.Mariner
  4: Blue.CornflowerBlue
  5: Blue.Sail
  6: Blue.PattensBlue
} = [
  Blue.MidnightBlue,
  Blue.CongressBlue,
  Blue.ToryBlue,
  Blue.Mariner,
  Blue.CornflowerBlue,
  Blue.Sail,
  Blue.PattensBlue,
]

export default {
  blue,
  gray,
  yellow,
}
