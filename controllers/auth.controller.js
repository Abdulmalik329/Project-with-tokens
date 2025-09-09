const sign_up = async (req, res) => {
  try {
    const { email, password } = req.body;

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return sendErrorResponse({ message: "User already exists" }, res, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 7);
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    res.status(201).send({ message: "New user added", data: newUser });
  } catch (err) {
    sendErrorResponse(err, res, 400);
  }
};

const sign_in = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return sendErrorResponse(
        { message: "Invalid email or password" },
        res,
        401
      );
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return sendErrorResponse(
        { message: "Invalid email or password" },
        res,
        401
      );
    }

    const payload = {
      id: user.id,
      email: user.email,
      is_active: user.is_active,
      role: "user",
    };

    const tokens = jwtService.generateTokens(payload);

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    user.refresh_token = hashedRefreshToken;
    await user.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });

    res.send({ message: "User logged in", accessToken: tokens.accessToken });
  } catch (err) {
    sendErrorResponse(err, res, 500);
  }
};

const sign_out = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return sendErrorResponse(
        { message: "Cookie refresh token not found" },
        res,
        400
      );
    }

    const verifiedRefreshToken = await jwtService.verifyRefreshToken(
      refreshToken
    );
    const user = await User.findByPk(verifiedRefreshToken.id);

    if (!user) {
      return sendErrorResponse({ message: "User not found" }, res, 404);
    }

    user.refresh_token = null;
    await user.save();

    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};
